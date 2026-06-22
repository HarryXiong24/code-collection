import torch
import torch.nn as nn
from torch.nn import functional as F

# ===================== 超参数(hyperparameters) =====================
batch_size = 32  # 一次并行处理多少条独立的序列(批大小)
block_size = 8  # 预测时使用的最大上下文长度(一次最多看前面 8 个字符)
max_iters = 3000  # 总共训练多少步
eval_interval = 300  # 每隔多少步评估一次 loss
learning_rate = 1e-2  # 学习率(bigram 模型简单,可以用较大的学习率)
# 有 GPU 就用 cuda,否则用 cpu
device = "cuda" if torch.cuda.is_available() else "cpu"
eval_iters = 200  # 评估 loss 时,用多少个 batch 取平均(减少随机波动)
# ------------

# 固定随机种子,保证每次运行结果可复现
torch.manual_seed(1337)

# ===================== 读取数据 =====================
# 数据来源(莎士比亚文本):
# wget https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt
with open("input.txt", "r", encoding="utf-8") as f:
    text = f.read()

# ===================== 构建词表(字符级) =====================
# 取出文本中出现过的所有不重复字符,并排序,作为“词表”
chars = sorted(list(set(text)))
vocab_size = len(chars)  # 词表大小(有多少种不同的字符)

# 建立 字符 <-> 整数 的双向映射
# 举例:假设词表 chars = [' ', 'a', 'h', 'i', 't'](已排序)
#   enumerate(chars) 逐个给出 (下标 i, 字符 ch):(0,' '),(1,'a'),(2,'h'),(3,'i'),(4,'t')
# stoi(字符->编号):把每对反过来,字符当 key、编号当 value
#   stoi = {' ': 0, 'a': 1, 'h': 2, 'i': 3, 't': 4}
stoi = {ch: i for i, ch in enumerate(chars)}  # string to int:字符 -> 编号
# itos(编号->字符):正好是 stoi 的反向
#   itos = {0: ' ', 1: 'a', 2: 'h', 3: 'i', 4: 't'}
itos = {i: ch for i, ch in enumerate(chars)}  # int to string:编号 -> 字符
# 编码器:输入字符串,把每个字符查 stoi 换成数字
#   encode("hi t") -> [2, 3, 0, 4]  ('h'->2,'i'->3,' '->0,'t'->4)
encode = lambda s: [stoi[c] for c in s]
# 解码器:输入整数列表,每个数字查 itos 换回字符,再用 "".join 拼成字符串
#   decode([2, 3, 0, 4]) -> "hi t"
# 二者互为逆操作:decode(encode("hi t")) == "hi t"
# 作用:神经网络只能处理数字 —— encode 把文本变数字喂给模型,decode 把模型输出变回文本
decode = lambda l: "".join([itos[i] for i in l])

# ===================== 划分训练集 / 验证集 =====================
# 把整段文本编码成一个长整型张量
data = torch.tensor(encode(text), dtype=torch.long)
n = int(0.9 * len(data))  # 前 90% 做训练,后 10% 做验证
train_data = data[:n]
val_data = data[n:]


# ===================== 取一个小批量数据 =====================
# 整体举例(假设 block_size=4, batch_size=2):
#   假设 data = [18, 47, 56, 57, 58,  1, 15, 47, 58, 47, ...]
#   randint(len(data)-block_size, (batch_size,)) 随机选 2 个起点,比如 ix = [0, 5]
#   起点 0 -> x = data[0:4] = [18, 47, 56, 57]
#            y = data[1:5] = [47, 56, 57, 58]   (x 右移一位)
#   起点 5 -> x = data[5:9] = [ 1, 15, 47, 58]
#            y = data[6:10]= [15, 47, 58, 47]
#   torch.stack 把这 2 条堆成矩阵:
#     x = [[18,47,56,57],      y = [[47,56,57,58],
#          [ 1,15,47,58]]           [15,47,58,47]]   形状都是 (batch_size, block_size)
#   含义:x 的每个位置,它的“下一个字符答案”就是 y 同一位置的值
#     例如 x[0] 中 18 的下一个是 47,47 的下一个是 56 ...(正好就是 y[0])
def get_batch(split):
    # 根据 split 选择从训练集还是验证集取数据
    data = train_data if split == "train" else val_data
    # 随机取 batch_size 个起始位置(减 block_size 保证每段都能取到 block_size+1 个字符)
    # 例:len(data)-block_size 之内随机出 [0, 5]
    ix = torch.randint(len(data) - block_size, (batch_size,))
    # x:每条样本是从 i 开始的 block_size 个字符(输入)
    # 例:i=0 -> [18,47,56,57];i=5 -> [1,15,47,58]
    x = torch.stack([data[i : i + block_size] for i in ix])
    # y:对应的“下一个字符”,即把 x 整体右移一位(预测目标)
    # 例:i=0 -> [47,56,57,58];i=5 -> [15,47,58,47]
    y = torch.stack([data[i + 1 : i + block_size + 1] for i in ix])
    # 把数据搬到目标设备(GPU/CPU)
    x, y = x.to(device), y.to(device)
    return x, y


@torch.no_grad()  # 该函数内不计算梯度(只评估,省内存、更快)
def estimate_loss():
    out = {}
    model.eval()  # 切换到评估模式(对 dropout/batchnorm 等有影响,这里其实没有)
    for split in ["train", "val"]:
        losses = torch.zeros(eval_iters)
        # 多取几个 batch 算 loss 再求平均,得到更稳定的估计
        for k in range(eval_iters):
            X, Y = get_batch(split)
            logits, loss = model(X, Y)
            losses[k] = loss.item()
        out[split] = losses.mean()
    model.train()  # 评估完切回训练模式
    return out


# ===================== 超简单的 Bigram 语言模型 =====================
class BigramLanguageModel(nn.Module):

    def __init__(self, vocab_size):
        super().__init__()
        # 核心:一个 vocab_size × vocab_size 的查找表(嵌入表)
        # 每个 token 直接“查表”得到下一个 token 的打分(logits)
        # 也就是说,只看当前这一个字符,就预测下一个字符 —— 这就是 bigram
        self.token_embedding_table = nn.Embedding(vocab_size, vocab_size)

    def forward(self, idx, targets=None):
        # idx 和 targets 都是 (B, T) 的整数张量
        # B = batch_size,T = block_size(时间步/序列长度)
        # 查表得到每个位置对下一个字符的打分,形状 (B, T, C),C = vocab_size
        logits = self.token_embedding_table(idx)

        if targets is None:
            # 没有目标时(纯生成阶段),不计算 loss
            loss = None
        else:
            # cross_entropy 要求 logits 形状为 (N, C),targets 为 (N,)
            # 所以把 (B, T, C) 摊平成 (B*T, C)
            B, T, C = logits.shape
            logits = logits.view(B * T, C)
            targets = targets.view(B * T)
            # 用交叉熵衡量“预测分布”与“真实下一个字符”的差距
            loss = F.cross_entropy(logits, targets)

        return logits, loss

    def generate(self, idx, max_new_tokens):
        # idx 是 (B, T) 的当前上下文;不断往后生成 max_new_tokens 个字符
        for _ in range(max_new_tokens):
            # 前向得到预测(这里不需要 targets)
            logits, loss = self(idx)
            # 只关心序列最后一个时间步的预测,形状变为 (B, C)
            # (bigram 只依赖最后一个字符,所以前面的时间步用不上)
            logits = logits[:, -1, :]
            # softmax 把打分转成概率分布,形状 (B, C)
            probs = F.softmax(logits, dim=-1)
            # 按概率分布随机采样一个下一个字符,形状 (B, 1)
            idx_next = torch.multinomial(probs, num_samples=1)
            # 把新采样的字符拼接到序列末尾,形状变为 (B, T+1)
            idx = torch.cat((idx, idx_next), dim=1)
        return idx


# ===================== 实例化模型 =====================
model = BigramLanguageModel(vocab_size)
m = model.to(device)  # 把模型参数搬到目标设备

# 创建优化器(AdamW),负责根据梯度更新模型参数
optimizer = torch.optim.AdamW(model.parameters(), lr=learning_rate)

# ===================== 训练循环 =====================
for iter in range(max_iters):

    # 每隔 eval_interval 步,评估一次训练集 / 验证集的 loss 并打印
    if iter % eval_interval == 0:
        losses = estimate_loss()
        print(
            f"step {iter}: train loss {losses['train']:.4f}, val loss {losses['val']:.4f}"
        )

    # 取一个训练批次
    xb, yb = get_batch("train")

    # 前向计算 loss
    logits, loss = model(xb, yb)
    optimizer.zero_grad(set_to_none=True)  # 清空上一步残留的梯度
    loss.backward()  # 反向传播:计算梯度
    optimizer.step()  # 用梯度更新参数

# ===================== 用训练好的模型生成文本 =====================
# 用一个全 0 的起始上下文(0 对应换行符,作为起点)
context = torch.zeros((1, 1), dtype=torch.long, device=device)
# 生成 500 个字符,取第 0 条序列,解码回字符串后打印
print(decode(m.generate(context, max_new_tokens=500)[0].tolist()))
