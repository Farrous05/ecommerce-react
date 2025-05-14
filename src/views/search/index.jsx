/* eslint-disable react/jsx-props-no-spreading */
import { LoadingOutlined } from '@ant-design/icons';
import { Boundary, MessageDisplay } from '@/components/common';
import FirebaseIndexMessage from '@/components/common/FirebaseIndexMessage';
import { ProductGrid } from '@/components/product';
import { useDidMount } from '@/hooks';
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '@/redux/actions/miscActions';
import { searchProduct } from '@/redux/actions/productActions';

const Search = ({ match }) => {
  const { searchKey } = match.params;
  const dispatch = useDispatch();
  const didMount = useDidMount(true);
  const [indexError, setIndexError] = useState(false);
  const [indexUrl, setIndexUrl] = useState('https://console.firebase.google.com/v1/r/project/main-f8628/firestore/indexes?create_composite=Cktwcm9qZWN0cy9tYWluLWY4NjI4L2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9wcm9kdWN0cy9pbmRleGVzL18QARoMCghrZXl3b3JkcxgBGg0KCWRhdGVBZGRlZBACGgwKCF9fbmFtZV9fEAI');
  
  const store = useSelector((state) => ({
    isLoading: state.app.loading,
    products: state.products.searchedProducts.items,
    basket: state.basket,
    requestStatus: state.app.requestStatus
  }));

  useEffect(() => {
    let isSubscribed = true;

    if (didMount && !store.isLoading) {
      const action = searchProduct(searchKey);
      const promise = dispatch(action);
      
      // Firebase index error detection
      setTimeout(() => {
        if (isSubscribed && store.requestStatus && 
            store.requestStatus.includes('The query requires an index')) {
          setIndexError(true);
        }
      }, 1000);
    }

    return () => {
      isSubscribed = false;
    };
  }, [searchKey]);

  useEffect(() => () => {
    dispatch(setRequestStatus(''));
  }, []);

  // Display Firebase index message if needed
  if (indexError) {
    return (
      <main className="content">
        <FirebaseIndexMessage indexUrl={indexUrl} />
      </main>
    );
  }

  if (store.requestStatus && !store.isLoading) {
    return (
      <main className="content">
        <MessageDisplay
          message={store.requestStatus}
          desc="Try using correct filters or keyword."
        />
      </main>
    );
  }

  if (!store.requestStatus && !store.isLoading) {
    return (
      <Boundary>
        <main className="content">
          <section className="product-list-wrapper product-list-search">
            {!store.requestStatus && (
              <div className="product-list-header">
                <div className="product-list-header-title">
                  <h5>
                    {`Found ${store.products.length} ${store.products.length > 1 ? 'products' : 'product'} with keyword ${searchKey}`}
                  </h5>
                </div>
              </div>
            )}
            <ProductGrid products={store.products} />
          </section>
        </main>
      </Boundary>
    );
  }

  return (
    <main className="content">
      <div className="loader">
        <h4>Searching Product...</h4>
        <br />
        <LoadingOutlined style={{ fontSize: '3rem' }} />
      </div>
    </main>
  );
};

Search.propTypes = {
  match: PropType.shape({
    params: PropType.shape({
      searchKey: PropType.string
    })
  }).isRequired
};

export default Search;
