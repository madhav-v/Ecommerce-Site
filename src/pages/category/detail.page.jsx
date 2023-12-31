import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import category from "../admin/category";
import { toast } from "react-toastify";
import SingleProductListGrid from "../home/component/single-product-list-grid.component";

const CategoryDetail = () => {
  let params = useParams();
  const [catDetail, setCatDetail] = useState();
  const [ProdDetail, setProdDetail] = useState();
  const [loading, setLoading] = useState(true);

  const loadCategoryDetail = useCallback(async () => {
    try {
      let response = await category.categorySvc.getDetailCategory(params.slug);
      setCatDetail(response.data.categoryDetail);
      setProdDetail(response.data.productList);
     
    } catch (exception) {
      toast.warn("Error during Category Fetch");
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    loadCategoryDetail();
  }, [params]);

  return (
    <>
      <Container className="my-3">
        {loading ? (
          <>Loading..</>
        ) : (
          <>
            <Row className="bg-light">
              <Col>
                <h4>Products of {catDetail.name}</h4>
              </Col>
            </Row>
            <Row>
              {ProdDetail ? (
                <>
                  {ProdDetail.map((product, index) => (
                    <SingleProductListGrid key={index} product={product} />
                  ))}
                </>
              ) : (
                <Col sm={12}>
                  <p className="text-danger">No products available</p>
                </Col>
              )}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default CategoryDetail;
