class ByteTokenizer:
    def __init__(self, token_alphabet: list[bytes]):
        # token_alphabet: list[bytes]
        self.token_alphabet = token_alphabet

        # bytes -> token_id 的反向映射
        self.token_to_id: dict[bytes, int] = {
            token: i for i, token in enumerate(token_alphabet)
        }

        # Pre-calculate valid pairs that can merge into each multi-byte token
        # merges_for_id[target_id] = {(left_id, right_id), ...}
        self.merges_for_id = []
        for i in range(256):
            self.merges_for_id.append(set())

        for i in range(256, len(self.token_alphabet)):
            cur_token_bytes = self.token_alphabet[i]
            valid_pairs = set()
            for split_point in range(1, len(cur_token_bytes)):
                left_id = self.token_to_id.get(cur_token_bytes[:split_point])
                right_id = self.token_to_id.get(cur_token_bytes[split_point:])
                if left_id is not None and right_id is not None:
                    valid_pairs.add((left_id, right_id))
            self.merges_for_id.append(valid_pairs)

    # NOTE: DO NOT CHANGE ANY CODE IN slow_tokenize.
    def slow_tokenize(self, text: bytes) -> list[int]:
        """
        Tokenize some text slowly using a naive algorithm.

        Returns a list of ints. Each int represents the zero-based
        index of a token within self.token_alphabet.
        """

        # STEP 1: INITIALIZATION

        # We initialize the list of tokens (token_ids) by treating
        # each byte in the text as its own single-byte token.
        #
        # Thanks to our guarantees on self.token_alphabet, we can
        # perform this conversion simply by translating each byte
        # in the text to its corresponding ASCII integer value.
        # This is especially easy to do in Python via list(text).
        #
        # Example: the text b"hello" becomes the following list of
        # tokens:
        # [
        #   104,  # (corresponding to b"h")
        #   101,  # (corresponding to b"e")
        #   108,  # (corresponding to b"l")
        #   108,  # (corresponding to b"l")
        #   111,  # (corresponding to b"o")
        # ]

        token_ids: list[int] = list(text)
        print("token_ids \n", token_ids)

        print("token_alphabet \n", self.token_alphabet)
        print("token_to_id \n", self.token_to_id)

        # STEP 2: MERGING INTO MULTI-BYTE TOKENS

        # We iterate over each multi-byte token in ascending order
        # of appearance in the token_alphabet. For each such token,
        # we scan over token_ids and try to merge
        # consecutive pairs of tokens into the current token.
        #
        # Carefully read the code below to understand the precise
        # logic of how this is done.

        for cur_token_id in range(256, len(self.token_alphabet)):
            cur_token_bytes = self.token_alphabet[cur_token_id]
            print("cur_token_bytes", cur_token_bytes)

            # Find which pairs of smaller tokens can be merged into
            # the current token.
            pairs_to_merge: set[tuple[int, int]] = set()
            for split_point in range(1, len(cur_token_bytes)):
                left_bytes = cur_token_bytes[:split_point]
                right_bytes = cur_token_bytes[split_point:]

                left_id = self.token_to_id.get(left_bytes)
                right_id = self.token_to_id.get(right_bytes)

                print("left_id, right_id:", left_id, right_id)

                # If both parts exist as tokens, this is a valid merge
                if left_id is not None and right_id is not None:
                    pairs_to_merge.add((left_id, right_id))

            # Perform all valid merges for the current token,
            # from left to right.
            new_token_ids: list[int] = []
            i = 0
            while i < len(token_ids):
                # Check if tokens at positions (i, i + 1) can be
                # merged into the current token.
                if (
                    i < len(token_ids) - 1
                    and (token_ids[i], token_ids[i + 1]) in pairs_to_merge
                ):
                    new_token_ids.append(cur_token_id)
                    i += 2
                else:  # No merge is possible, copy the original token
                    new_token_ids.append(token_ids[i])
                    i += 1

            token_ids = new_token_ids

        return token_ids

    def optimize_tokenize(self, text: bytes) -> list[int]:
        """
        Optimized version of slow_tokenize.
        Uses the same logic but avoids redundant re-scans where possible.
        """
        if not text:
            return []

        token_ids = list(text)

        # We iterate through the alphabet indices starting from 256
        for cur_token_id in range(256, len(self.token_alphabet)):
            print("merges_for_id", self.merges_for_id)
            pairs_to_merge = self.merges_for_id[cur_token_id]
            if not pairs_to_merge:
                continue

            # Linear scan for merges. While we could use linked lists to
            # speed up deletions, for Python, a list rebuild is often faster
            # due to internal optimizations unless the list is massive.
            new_token_ids = []
            i = 0
            while i < len(token_ids):
                if (
                    i < len(token_ids) - 1
                    and (token_ids[i], token_ids[i + 1]) in pairs_to_merge
                ):
                    new_token_ids.append(cur_token_id)
                    i += 2
                else:
                    new_token_ids.append(token_ids[i])
                    i += 1
            token_ids = new_token_ids

        return token_ids


import random


class ByteTokenizer:
    def __init__(self, token_alphabet: list[bytes]):
        self.token_alphabet = token_alphabet
        self.token_to_id: dict[bytes, int] = {
            token: i for i, token in enumerate(token_alphabet)
        }

        # Pre-calculate valid pairs that can merge into each multi-byte token
        # merges_for_id[target_id] = {(left_id, right_id), ...}
        self.merges_for_id = []
        for i in range(256):
            self.merges_for_id.append(set())

        for i in range(256, len(self.token_alphabet)):
            cur_token_bytes = self.token_alphabet[i]
            valid_pairs = set()
            for split_point in range(1, len(cur_token_bytes)):
                left_id = self.token_to_id.get(cur_token_bytes[:split_point])
                right_id = self.token_to_id.get(cur_token_bytes[split_point:])
                if left_id is not None and right_id is not None:
                    valid_pairs.add((left_id, right_id))
            self.merges_for_id.append(valid_pairs)

    def slow_tokenize(self, text: bytes) -> list[int]:
        # (Reference implementation provided in prompt)
        token_ids = list(text)
        for cur_token_id in range(256, len(self.token_alphabet)):
            cur_token_bytes = self.token_alphabet[cur_token_id]
            pairs_to_merge = self.merges_for_id[cur_token_id]

            if not pairs_to_merge:
                continue

            new_token_ids = []
            i = 0
            while i < len(token_ids):
                if (
                    i < len(token_ids) - 1
                    and (token_ids[i], token_ids[i + 1]) in pairs_to_merge
                ):
                    new_token_ids.append(cur_token_id)
                    i += 2
                else:
                    new_token_ids.append(token_ids[i])
                    i += 1
            token_ids = new_token_ids
        return token_ids

    def tokenize(self, text: bytes) -> list[int]:
        """
        Optimized version of slow_tokenize.
        Uses the same logic but avoids redundant re-scans where possible.
        """
        if not text:
            return []

        token_ids = list(text)

        # We iterate through the alphabet indices starting from 256
        for cur_token_id in range(256, len(self.token_alphabet)):
            pairs_to_merge = self.merges_for_id[cur_token_id]
            if not pairs_to_merge:
                continue

            # Linear scan for merges. While we could use linked lists to
            # speed up deletions, for Python, a list rebuild is often faster
            # due to internal optimizations unless the list is massive.
            new_token_ids = []
            i = 0
            n = len(token_ids)
            while i < n:
                if i < n - 1 and (token_ids[i], token_ids[i + 1]) in pairs_to_merge:
                    new_token_ids.append(cur_token_id)
                    i += 2
                else:
                    new_token_ids.append(token_ids[i])
                    i += 1
            token_ids = new_token_ids

        return token_ids

    def estimate_token_count(
        self, text: bytes, sample_size: int, rng: random.Random
    ) -> float:
        """
        Estimates total tokens by sampling a continuous chunk of the text.
        """
        text_len = len(text)

        # Requirement: Exact count if text fits in sample_size
        if text_len <= sample_size:
            return len(self.tokenize(text))

        # Sample a random continuous window of 'sample_size' bytes
        # Sampling a contiguous block is better for tokenization context than
        # random scattered bytes.
        start_idx = rng.randint(0, text_len - sample_size)
        sample_text = text[start_idx : start_idx + sample_size]

        sample_tokens = self.tokenize(sample_text)
        tokens_per_byte = len(sample_tokens) / sample_size

        return tokens_per_byte * text_len


# test
token_alphabet = [bytes([i]) for i in range(256)]
token_alphabet += [
    b"he",
    b"hello",
    b"world",
]
tokenizer = ByteTokenizer(token_alphabet)

# res = tokenizer.slow_tokenize(b"hello")
res = tokenizer.optimize_tokenize(b"hello")
print(res)
