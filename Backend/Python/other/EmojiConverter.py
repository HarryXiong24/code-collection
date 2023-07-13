# Print Emojis with text

Command = input(">>")
your_words = Command.split(' ')             # Split Command breaks your sentences into separate strings
emojis = {
    ":)" : "😊",
    ":(" : "😟",
    ":D" : "😁",
    "lol" : "😂"
}

result = ''                                 # This is our output variable
for code in your_words:
        result += emojis.get(code, code) + " "      #
print(result)

