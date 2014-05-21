#!/bin/bash

OUTPUT="index.html" 
this_file=`basename "$0"`

i=0
echo "<html>" > $OUTPUT
echo "<body>" >> $OUTPUT
echo "<ul>" >> $OUTPUT
for i in `find "." -maxdepth 1 -mindepth 1 -type f| sort`; do
  file=`basename "$i"`
  if [ "$file" != "$this_file" ]
    then echo "    <li><a href=\"$file\">$file</a></li>" >> $OUTPUT
  fi
done
echo "</ul>" >> $OUTPUT
echo "</body>" >> $OUTPUT
echo "</html>" >> $OUTPUT
