# -*- coding: utf-8 -*-
#split dump.txt to nodes.csv, relations.csv, types_relation.csv

source = open(ARGV[0], 'r')
nodes_file = open('nodes.csv', 'w')
relations_file = open('relations.csv', 'w')
types_relation_file = open('types_relation.csv', 'w')


$stop_word = ['erc_INFO-POS-NP','_INFO-POS-MASC','_INFO-NO-MORE-QUESTION','_INFO-POS-PLUR','_INFO-POS-VERB','_INFO-POS-NC','_INFO-POS-FEM','_INFO-POS-SING','_INFO-POS-VER','_INFO-LPOP','_INFO-POS-ADJ','_INFO-LSOUT','_INFO-POS-ADV-EXPR','_INFO-POS-ADV','_POL-POS_PC','_POL-NEUTRE_PC','_POL-NEG_PC','_INFO-WIKI-NO','_INFO-WIKI-YES','_INFO-POS','_POLIT_6FN','_POLIT_1ECO','_POLIT_2PG','_POLIT_5UMP','_POLIT_3PS','_POLIT_4MD','_POLIT_7NOPOL','_INFO','_OCC-IGNORE','_INFO-CNRTL-YES','_INFO-CNRTL-NO','_TERM_GROUP','_SEX_NEUTRAL']
$stop_eid = []

def valid_line_node(line)
  substr = line[0, 3]
  line_split = line.force_encoding('iso-8859-1').split('|')
  if substr == 'eid'
    n = line_split[1][3...line_split[1].length-1]
    for i in 0...$stop_word.length
      if n == $stop_word[i]
        eid = line_split[0][4...line_split[0].length].to_i
        $stop_eid.push(eid)
        return false
      end
    end
    return true
  end
  return false
end

def valid_line_relation(line)
  substr = line[0, 3]
  line_split = line.force_encoding('iso-8859-1').split('|')
  if substr == 'rid'
    n1 = line_split[1][3...line_split[1].length].to_i
    n2 = line_split[2][3...line_split[2].length].to_i
    for i in 0...$stop_eid.length
        if n1 == $stop_eid[i] || n2 == $stop_eid[i]
          return false
        end
    end
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
