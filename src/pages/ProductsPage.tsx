import React, { useEffect, useState } from "react";
import {
  getProducts,
  updateProduct,
  deleteProduct,
  addProduct,
} from "../api/productApi";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup";
import ProductUpdate from "../components/ProductUpdate";
import AddProduct from "../components/AddProduct";
import { Product } from "../types/Product";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Fonction pour récupérer les produits
  const fetchProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

  // Ouvrir le popup de mise à jour
  const handleUpdateClick = (product: Product) => {
    setProductToUpdate(product);
    setShowUpdatePopup(true);
  };

  // Ouvrir le popup de confirmation pour supprimer un produit
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeletePopup(true);
  };

  // Fonction pour confirmer la mise à jour
  const handleConfirmUpdate = async (updatedProduct: Product) => {
    try {
      await updateProduct(updatedProduct._id, updatedProduct); // Correction ici
      fetchProducts(); // Recharger la liste après la mise à jour
      setShowUpdatePopup(false);
      setProductToUpdate(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit:", error);
    }
  };

  // Fonction pour confirmer la suppression
  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete._id);
        fetchProducts(); // Recharger la liste après suppression
        setShowDeletePopup(false);
        setProductToDelete(null);
      } catch (error) {
        console.error("Erreur lors de la suppression du produit:", error);
      }
    }
  };

  // Fonction pour ajouter un produit
  const handleAddProduct = async (product: {
    name: string;
    price: number;
    description: string;
    quantity: number;
  }) => {
    try {
      await addProduct(product);
      fetchProducts(); // Recharger la liste après l'ajout
      setShowAddPopup(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
    }
  };

  // Fonction pour annuler la suppression
  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setProductToDelete(null);
  };

  // Fonction pour annuler la mise à jour
  const handleCancelUpdate = () => {
    setShowUpdatePopup(false);
    setProductToUpdate(null);
  };

  // Fonction pour annuler l'ajout de produit
  const handleCancelAdd = () => {
    setShowAddPopup(false);
  };

  useEffect(() => {
    fetchProducts(); // Charger les produits lors du montage du composant
  }, []);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          {/* Header - Titre et bouton ajouter */}
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Liste des produits
            </h2>

            <button
              onClick={() => setShowAddPopup(true)}
              className="mt-6 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 sm:mt-0"
            >
              Ajouter un produit
            </button>
          </div>

          {/* Liste des produits */}
          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {products.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                  Aucun produit disponible pour le moment.
                </p>
              ) : (
                products.map((product) => (
                  <div
                    key={product._id}
                    className="flex flex-wrap items-center gap-y-4 py-6"
                  >
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Nom du produit:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Prix:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        {product.price} €
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Quantité:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        {product.quantity > 0
                          ? product.quantity
                          : "Rupture de stock"}
                      </dd>
                    </dl>

                    {/* Actions : Modifier et Supprimer */}
                    <div className="grid w-full gap-4 sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end">
                      {/* Bouton Modifier */}
                      <button
                        onClick={() => handleUpdateClick(product)}
                        className="rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
                      >
                        Modifier
                      </button>
                      {/* Bouton Supprimer */}
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Affichage du popup d'ajout */}
      {showAddPopup && (
        <AddProduct
          onAddProduct={handleAddProduct}
          onCancel={handleCancelAdd}
        />
      )}

      {/* Affichage du popup de confirmation */}
      {showDeletePopup && productToDelete && (
        <ConfirmDeletePopup
          productName={productToDelete.name}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Affichage du popup de mise à jour */}
      {showUpdatePopup && productToUpdate && (
        <ProductUpdate
          product={productToUpdate}
          onUpdate={handleConfirmUpdate}
          onCancel={handleCancelUpdate}
        />
      )}
    </section>
  );
};

export default ProductsPage;
