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

## format dump.txt

3. Run split_dump_to_csv.rb with dump.txt in argument
   ```shell
   $ ruby ../neo4j/create_database/split_dump_to_csv.rb dump.txt
   ```

## format TermDef.sql

4. Run get_term_def.rb with TermDef.sql in argument to transform in term_def.csv
   ```shell
   $ ruby ../neo4j/create_database/get_term_def.rb
   ```

5. Sort from term_def.csv to term_def_tri.csv
   ```shell
   $ sort -n --field-separator=',' --key=1 term_def.csv > term_def_tri.csv
   ```

6. Run merge_term_def_tri_dbl.rb to create term_def_tri_merge_dbl.csv
   ```shell
   $ ruby ../neo4j/create_database/merge_term_def_tri_dbl.rb
   ```

7. Run create_rels_node_def.rb to create relation between a node and his definition
   ```shell
   $ ruby ../neo4j/create_database/create_rels_node_def.rb
   ```

## create database

8. Check your neo4j directory path at the line 3 of create_db.rb
   ```shell
   $ gedit ../neo4j/create_database/create_db.rb
   ```

9. And run create_db.rb
   ```shell
   $ ruby ../neo4j/create_database/create_db.rb
   ```
