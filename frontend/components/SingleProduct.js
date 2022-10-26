import gql from "graphql-tag";
import {useQuery} from "@apollo/client";
import DisplayError from "./ErrorMessage";
import Head from 'next/head';
import styled from 'styled-components';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql `
  query SINGLE_ITEM_QUERY {
    product(where: { id: "cl9p2t9ew0115ar3rzcu9nbs1" }) {
      name
      price
      description
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
    const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
        variables: {
            id,
        },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <DisplayError error={error} />;
    const { product } = data;
    console.log(product);
    return (
        <ProductStyles>
            <Head>
                <title>Sick Fits | {product.name}</title>
            </Head>
            <img
                src={product.photo.image.publicUrlTransformed}
                alt={product.photo.altText}
            />
            <div className="details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
            </div>
        </ProductStyles>
    );
}