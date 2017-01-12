#transform TermDef.sql to term_def.csv

source = open(ARGV[0], 'r')
term_def_file = open('term_def.csv', 'w')

def valid_line_term_def(line)
  if line[0] == '('
      return true
  end
  return false
end

def write_term_def(line, file)
  _termid = ""
  _def = ""
  i1 = 1
  l1 = 0
  for i in i1...line.length
    c = line[i]
    if c == ','
      l1 = i - i1
      break
    end
  end
  i2 = i1 + l1 + 2
  l2 = 0
  for i in i2...line.length
    c = line[i]
    if c == ','
      l2 = i - i2
      break
    end
    _termid += c
  end
  i3 = i2 + l2 + 2
  i4 = 0
  (line.length - 3).downto(0) do |i|
    c = line[i]
    if c == ','
      i4 = i
      break
    end
  end
  i5 = 0
  (i4 - 1).downto(0) do |i|
    c = line[i]
    if c == ','
      i5 = i
      break
    end
  end
  _def = line[i3+1...i5-1]
  _def.tr!(',', '')
  _def.gsub!("''", "'")
  _def.gsub!("''", "'")
  _def.gsub!("''", "'")
  _def.gsub!("''", "'")
  file.puts "#{_termid},#{_def}"
end

cpt = 0

source.each do |line|
  if valid_line_term_def line
    write_term_def(line, term_def_file)
  end
  cpt += 1
  puts "#{cpt} lines treated"
end
