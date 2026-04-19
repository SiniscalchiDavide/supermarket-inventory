/*
  SUPERMARKET INVENTORY - Interfaccia Product
  =============================================
  Questa interfaccia definisce la struttura dati per i prodotti
  dell'applicazione supermarket inventory.
*/

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}