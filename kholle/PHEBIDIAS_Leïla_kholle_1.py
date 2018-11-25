#!/usr/bin/env python3

##Lilou444
##25-11-2018


import csv 
import sys
import getopt




def contenu(): #affiche le contenu du fichier 
    f = open('tes.csv') 
    cr = csv.reader(f)
    for ligne in cr :
         print("le contenu du tableau est :"+str(ligne))
contenu()

def le_max(): #donne la valeur maximum
    f = open('tes.csv') 
    cr = csv.reader(f)
    m=0
    for ligne in cr :
        m=max(ligne)
        print("le max est"+" " + m)
le_max()



def le_min(): #donne la valeur minimum 
    f = open('tes.csv') 
    cr = csv.reader(f)
    p=0
    for ligne in cr :
        p=min(ligne)
        print("le min est"+" "+p)
le_min()

def trie_ordre_croissant(): #trie par odre croissant 
    f = open('tes.csv') 
    cr = csv.reader(f)
    for ligne in cr :
        ligne.sort()
        print("ordre croissant:"+str(ligne))
trie_ordre_croissant()



def trie_ordre_decroissant(): #trie par odre decroissant 
    f = open('tes.csv') 
    cr = csv.reader(f)
    for ligne in cr :
        ligne.sort(reverse=True)
        print("ordre decroissant:"+str(ligne))    
trie_ordre_decroissant()


def sup(): #supprime tout le fichier 
    r = csv.reader(file("tes.csv"))
    w = csv.writer(file("tes.csv", "w"))
    for ligne in r:
        if ligne[0] != "":
            w.writerow(ligne)
print("le fichier est vide")
sup()

def ajou_elements(input_string): #ajoute des elements 
    r = csv.reader(file("tes.csv"))
    with open("tes.csv", "a") as csv_file:
        csv_file.write(input_string + "\n")
    for ligne in r :# on affiche le contenu du fichier 
         print("le nouveau contenu du tableau est :"+str(ligne))
ajou_elements("2")

def main(argv):  #permet les options en ligne de commande 
   testy= "test2.py"
   try:
      opts, args = getopt.getopt(argv,"hc:s",["help","max","min","sum","desc"])
   except getopt.GetoptError:
      print 'il y a une erreur test2.py -i'
      sys.exit(2)
   for opt, arg in opts:
      if opt in("-h","--help"):
         usage()
         sys.exit()
      if opt == '-c':
          return sup()
      if opt == '-i':
           return contenu()
      if opt == '-s --max':
           return le_max()
      if opt == '-s --min':
           return  le_min()
      if opt == '-t':
          return  trie_ordre_croissant()
      if opt == '-t --desc':
           return  trie_ordre_decroissant()
if __name__ == "__main__":
   main(sys.argv[1:])
