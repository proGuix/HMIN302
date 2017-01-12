#merge doublons of term_def_tri.csv

term_def_tri_file = open('term_def_tri.csv', 'r')
term_def_tri_merge_dbl_file = open('term_def_tri_merge_dbl.csv', 'w')


def term_def_split(line)
  return line.split(',')
end

term_def_tri_merge_dbl_file.puts 'eid:ID(Term_Def),def'

cpt = 0
a = 0

term_def_tri_file.each do |line|
  result = term_def_split line
  eid = result[0]
  if eid != a
    if cpt > 0
      term_def_tri_merge_dbl_file.write "\n"
    end
    term_def_tri_merge_dbl_file.write "#{line[0...line.length-1]}"
  else
    term_def_tri_merge_dbl_file.write " #{result[1][0...result[1].length-1]}"
  end
  a = eid
  cpt += 1
  puts "#{cpt} lines treated"
end
