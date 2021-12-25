import sys

from gensim.summarization import summarize
data=sys.argv[1];

#print(data)
data=str(data)
print(summarize(data,ratio=0.4))


sys.stdout.flush()
