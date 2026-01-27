export type Quote = {
  text: string;
  author: string;
  tag: string;
};

export const quotes: Quote[] = [
  { 
    text: "La medicina es la única profesión que lucha incesantemente por destruir la razón de su propia existencia.", 
    author: "James Bryce", 
    tag: "Medicina" 
  },
  { 
    text: "Dondequiera que se ame el arte de la medicina, se ama también a la humanidad.", 
    author: "Hipócrates", 
    tag: "Clásico" 
  },
  { 
    text: "Primero, no hacer daño.", 
    author: "Hipócrates", 
    tag: "Ética" 
  },
  { 
    text: "El médico cura, la naturaleza sana.", 
    author: "Hipócrates", 
    tag: "Filosofía" 
  },
  { 
    text: "La salud no es todo, pero sin ella, todo lo demás es nada.", 
    author: "Arthur Schopenhauer", 
    tag: "Filosofía" 
  },
  { 
    text: "No es más fuerte quien nunca cae, sino quien se levanta tras cada caída.", 
    author: "Confucio", 
    tag: "Resiliencia" 
  },
];