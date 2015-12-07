import re
#used to read the most common words and put them into a big javascript object

#make sure the file is in UNIX EOL format (\n)
source = open('3000_most_common_en.txt', 'r')

# python dictionaries print out to look just like javascript objects
result = {}

for line in source:
	arr = re.compile("\s").split(source.readline())
	result[arr[1]] = 0
	
source.close()

out = open("3000_most_common_en.js", "w")
out.write(str(result).lower())
out.close()
