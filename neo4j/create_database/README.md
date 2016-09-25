# create database

In HMIN302 directory, create a dump directory
$ cd ../../
$ mkdir dump

Dowload a dump file and extract
$ cd dump
$ wget http://www.jeuxdemots.org/JDM-LEXICALNET-FR/08282016-LEXICALNET-JEUXDEMOTS-FR-NOHTML.txt.zip
$ unzip 08282016-LEXICALNET-JEUXDEMOTS-FR-NOHTML.txt.zip
$ mv JDM-LEXICALNET-FR/08282016-LEXICALNET-JEUXDEMOTS-FR-NOHTML.txt dump.txt
$ rm 08282016-LEXICALNET-JEUXDEMOTS-FR-NOHTML.txt.zip

Run split_dump_to_csv.rb with dump.txt in argument
$ ruby ../neo4j/create_database/split_dump_to_csv.rb dump.txt

Check your neo4j directory path at the line 3

And run create_db.rb
$ ruby ../neo4j/create_database/create_db.rb