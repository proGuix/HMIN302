term_def_file = open('term_def_tri_merge_dbl.csv', 'r')
rels_node_def_file = open('rels_node_def.csv', 'w')

rels_node_def_file.puts ':START_ID(Node),:END_ID(Term_Def),:TYPE'

def eid_line(line)
  eid = ""
  for i in 0...line.length
    c = line[i]
    if c == ','
      break
    end
    eid += c
  end
  return eid.to_i
end

bool = false

term_def_file.each do |line|
  if bool
    eid = eid_line line
    puts "eid: #{eid}"
    rels_node_def_file.puts "#{eid},#{eid},Def"
  end
  bool = true
end
