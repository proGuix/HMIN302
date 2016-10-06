# create database

1. In HMIN302 directory, create a dump directory
   ```shell
   $ mkdir dump
   ```

2. Download a dump zip and Term_Def.sql file and extract
   ```shell
   $ cd dump
   $ wget http://www.jeuxdemots.org/JDM-LEXICALNET-FR/08282016-LEXICALNET-JEUXDEMOTS-FR-NOHTML.txt.zip
   $ unzip 08282016-LEXICALNET-JEUXDEMOTS-FR-NOHTML.txt.zip
   $ iconv -t UTF-8 -f ISO-8859-15 JDM-LEXICALNET-FR/08282016-LEXICALNET-JEUXDEMOTS-FR-NOHTML.txt > dump.txt
   $ rm 08282016-LEXICALNET-JEUXDEMOTS-FR-NOHTML.txt.zip
   $ rm -r JDM-LEXICALNET-FR/
   $ wget http://www.lirmm.fr/~lafourca/EAPP/DUMP%20SQL/TermDef.sql
   ```

3. Run split_dump_to_csv.rb with dump.txt in argument
   ```shell
   $ ruby ../neo4j/create_database/split_dump_to_csv.rb dump.txt
   ```

4. Check your neo4j directory path at the line 3 of create_db.rb
   ```shell
   $ gedit ../neo4j/create_database/create_db.rb
   ```

5. And run create_db.rb
   ```shell
   $ ruby ../neo4j/create_database/create_db.rb
   ```