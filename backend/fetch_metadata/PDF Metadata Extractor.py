# import modules
from tkinter import *
import pdfx


# user defined funtion
def get_info():

	pdf = pdfx.PDFx(str(e1.get()))
	meta.set(pdf.get_metadata())
	url.set(pdf.get_references_as_dict())


# object of tkinter
# and background set for light grey
master = Tk()
master.configure(bg='light grey')


# Variable Classes in tkinter
meta = StringVar()
url = StringVar()


# Creating label for each information
# name using widget Label
Label(master, text="PDF or PDF-URL : ", bg="light grey").grid(row=0, sticky=W)
Label(master, text="Meta information :", bg="light grey").grid(row=3, sticky=W)
Label(master, text="URL information :", bg="light grey").grid(row=4, sticky=W)


# Creating label for class variable
# name using widget Entry
Label(master, text="", textvariable=meta,
	bg="light grey").grid(row=3, column=1, sticky=W)
Label(master, text="", textvariable=url, bg="light grey").grid(
	row=4, column=1, sticky=W)


e1 = Entry(master, width=100)
e1.grid(row=0, column=1)


# creating a button using the widget
# Button that will call the submit function
b = Button(master, text="Show", command=get_info, bg="Blue")
b.grid(row=0, column=2, columnspan=2, rowspan=2, padx=5, pady=5,)


mainloop()

#by Ajilore
