export type Product = {
  id: string;              // uuid gerado pelo banco (texto, não número)
  name: string;
  description: string | null; // String? no schema: pode vir null
  price: string;           // Decimal chega como texto: "19.9"
  imageUrl: string | null; // ex: "/images/mcbug.jpg"
  category: string;        // ex: "Burguers"
  available: boolean;
  createdAt: string;       // datas chegam como texto no JSON
};