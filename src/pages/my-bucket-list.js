import React, { useState, useContext } from "react";
import uniq from "lodash/uniq";
import { CollapseSection, Layout } from "../components";
import { EmptyModal } from "../components/bucket-list/EmptyModal";
import { CardsGrid } from "../components/layout/CardsGrid";
import { CollapseListings } from "../components/layout/CollapseListings";
import PageLayout from "../components/layout/PageLayout";
import { NoResults } from "../components/search";
import useLocalStorage from "../lib/hooks/use-local-storage";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider";
import { useMutation, gql } from "@apollo/client";

const UPDATE_BUCKET_LIST = gql`
  mutation ($input: UpdateBlMutationInput!) {
    updateBlMutation(input: $input) {
      bucketListUpdated
    }
  }
`;

const BucketListPage = () => {
  //   const { data: filters } = filtersData
  let [lsItems, setLsItems] = useLocalStorage("bucketList", []);
  //   const [openFilters, setOpenFilters] = useState(false)
  let [isOpenModal, setIsOpenModal] = useState(false);
  const [updateBlMutation] = useMutation(UPDATE_BUCKET_LIST);

  const { bucketListId, items: blItems } = useContext(GlobalStateContext);

  const items = bucketListId ? blItems : lsItems;
  const dispatch = useContext(GlobalDispatchContext);

  const emptyBl = () => {
    setLsItems([]);
    // updateBlMutation({
    //   variables: {
    //     input: {
    //       idInput: bucketListId,
    //       linksInput: [],
    //     },
    //   },
    // });

    setIsOpenModal(false);
  };

  const countries = uniq(
    items?.map((item) => item.commonDataAttributes?.country?.name) || ["1"]
  );

  return (
    <Layout>
      <EmptyModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        emptyBl={emptyBl}
      />
      <PageLayout
        title="My bucket list"
        smallMargin
        isFilters
        // openFilters={openFilters}
        // setOpenFilters={setOpenFilters}
        handleEmpty={() => setIsOpenModal(true)}
        notEmpty={items?.length > 0}
        // sidebar={
        //   bucket.length > 0 && (
        //     <SidebarFilters
        //       filtersComponents={<FiltersCommon filters={filters} />}
        //       openFilters={openFilters}
        //       setOpenFilters={setOpenFilters}
        //     />
        //   )
        // }
      >
        {items?.length > 0 ? (
          countries?.map((country, i) => {
            const itemsByCountry = items.filter(
              (item) => item?.commonDataAttributes?.country?.name === country
            );

            return (
              <CollapseSection title={country} key={i} listings>
                <div className="mt-5">
                  <CollapseListings listings={itemsByCountry} />
                  <CardsGrid cards={itemsByCountry} className="md:hidden" />
                </div>
              </CollapseSection>
            );
          })
        ) : (
          <NoResults
            title="Your bucket list is empty"
            subtitle="No-one should have an empty bucket list…. Add something by clicking the 'Add to bucket list' buttons on all of our recommendations - simple as that. Good luck!"
            className="mt-base2"
          />
        )}
      </PageLayout>
    </Layout>
  );
};

export default BucketListPage;
