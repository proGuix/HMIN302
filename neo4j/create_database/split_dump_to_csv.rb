#split dump.txt to nodes.csv, relations.csv, types_relation.csv

source = open(ARGV[0], 'r')
nodes_file = open('nodes.csv', 'w')
relations_file = open('relations.csv', 'w')
types_relation_file = open('types_relation.csv', 'w')

def valid_line_node(line)
  substr = line[0, 3]
  if substr == 'eid'
      return true
  end
  return false
end

def valid_line_relation(line)
  substr = line[0, 3]
  if substr == 'rid'
      return true
  end
  return false
end

def valid_line_type_relation(line)
  substr = line[0, 4]
  if substr == 'rtid'
    return true
  end
  return false
end

def write_node(line, file)
  line_split = line.force_encoding('iso-8859-1').split('|')
  result = []
  for i in 0...line_split.length
    if i == 1
      y = line_split[1][2, line_split[1].length]
      if y[0] == '"'
        y[y.length - 1] = '"'
      end
    else
      x = line_split[i].split('=')
      y = x[1]
    end
    result.push y
  end
  file.puts result[0] + ',' + result[1] + ',' + result[2] + ',' + result[3]
end

def write_relation(line, file)
  line_split = line.force_encoding('iso-8859-1').split('|')
  result = []
  line_split.each do |x|
    y = x.split('=')
    result.push y[1]
  end
  file.puts result[0] + ',' + result[1] + ',' + result[2] + ',' + result[3] + ',' + result[4]
end

def write_type_relation(line, file)
  line_split = line.force_encoding('iso-8859-1').split('|')
  result = []
  for i in 0...line_split.length
    if i == 0
      x = line_split[0].split('=')
      y = x[1]
    else
      j = 1
      case i
      when 1
        j = 5
      when 2
        j = 11
      when 3
        j = 5
      end
      y = line_split[i][j, line_split[i].length]
      if y[0] == '"' && i == 3
        y[y.length - 2] = '"'
      end
    end
    result.push y
  end
  file.puts result[0] + ',' + result[1] + ',' + result[2] + ',' + result[3]
end

nodes_file.puts 'eid:ID(Node),n,t:INT,w:INT'
relations_file.puts 'rid:INT,n1:START_ID(Node),n2:END_ID(Node),t:TYPE,w:INT'
types_relation_file.puts 'rtid:ID(Type_Rel),name,nom_etendu,info'

cpt = 0

source.each do |line|
  if valid_line_node line
    write_node(line, nodes_file)
  end
  if valid_line_relation line
    write_relation(line, relations_file)
  end
  if valid_line_type_relation line
    write_type_relation(line, types_relation_file)
  end
  cpt += 1
  puts "#{cpt} lines treated"
end
