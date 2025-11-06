import { useParams } from 'react-router-dom';

const ProductFormPage = () => {
  const { productId } = useParams();

  return (
    <div>
      Оформить {productId}
    </div>
  )
}

export default ProductFormPage;