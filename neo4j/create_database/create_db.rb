#create neo4j database from nodes.csv, relations.csv, types_relation.csv, rels_node_def.csv, term_def_tri_merge_dbl.csv,

dir_neo4j = '/home/guillaume/Bureau/neo4j-community-3.0.6/'

puts "BEGIN: NEO4J STOP"
puts `#{dir_neo4j}bin/neo4j stop`
puts "END: NEO4J STOP"

puts "BEGIN: DELETE OLD GRAPH.DB"
puts `rm -r #{dir_neo4j}data/databases/graph.db/`
puts "END: DELETE OLD GRAPH.DB"

puts "BEGIN: ADD NEW GRAPH.DB"
puts `#{dir_neo4j}bin/neo4j-import --into graph.db --id-type integer --nodes:Node nodes.csv --nodes:Term_Def term_def_tri_merge_dbl.csv --nodes:Type_Rel types_relation.csv --relationships relations.csv --relationships rels_node_def.csv`
puts "END: ADD NEW GRAPH.DB"

puts "BEGIN: MOVE GRAPH.DB"
puts `mv graph.db #{dir_neo4j}data/databases/`
puts "END: MOVE GRAPH.DB"

puts "BEGIN: ADD CONSTRAINT AND INDEX"
puts `#{dir_neo4j}bin/neo4j-shell -path #{dir_neo4j}data/databases/graph.db/ -file ../neo4j/cypher/constraints.cql`
puts "END: ADD CONSTRAINT AND INDEX"
