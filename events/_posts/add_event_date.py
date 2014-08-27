# -*- coding: utf-8 -*-
import os
import re
path="."
p = re.compile('^date:(.*?)$', re.M)
dirList = [fname for fname in os.listdir(path) if fname.endswith('.md')]
for fname in dirList:
    content = open(fname, 'r').read()
    m = p.search(content)
    print "Found in %s: %s" % (fname, m.group(0))
    content = p.sub(m.group(0) + '\nevent_date:\\1', content)
    with open(fname, 'w') as outfile:
        outfile.write(content)
