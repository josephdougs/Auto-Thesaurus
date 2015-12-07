import re
#used to read thesaurus and put them into a big javascript object


import re
#used to read the most common words and put them into a big javascript object

#make sure the file is in UNIX EOL format (\n)
source = open('3000_most_common_en.txt', 'r')

# python dictionaries print out to look just like javascript objects
common = {}

for line in source:
	arr = re.compile("\s").split(source.readline())
	common[arr[1]] = 0
	
source.close()



#make sure the file is in UNIX EOL format (\n)
source = open('th_en_US_new.dat', 'r')
source.readline() # get rid of the first line

# python dictionaries print out to look just like javascript objects
result = {}

for line in source:
	arr = line.split("|")
	key = arr[0]
	num_lines = int(arr[1])
	for i in range(num_lines):
		syns = source.readline().split("|")
		for j in range(1, len(syns)):
			if syns[j].lower() in common:
				if not(key in result):
					result[key] = {}
				result[key][syns[j].lower()] = 0
	
source.close()

out = open("US_en_thes.js", "w")
out.write(str(result))
out.close()