import React, { useState } from "react";
import uniq from "lodash/uniq";
import {
  CollapseSection,
  Layout,
  TravelQuote,
  SidebarSocialShare,
} from "../components";
import { EmptyModal } from "../components/bucket-list/EmptyModal";
import { CardsGrid } from "../components/layout/CardsGrid";
import { CollapseListings } from "../components/layout/CollapseListings";
import PageLayout from "../components/layout/PageLayout";
import { NoResults } from "../components/search";
import useLocalStorage from "../lib/hooks/use-local-storage";
import { useDbBucketList } from "../lib/hooks/useDbBucketList";
import { useAuth } from "../lib/hooks/useAuth";
import { useUpdateBucketList } from "../lib/hooks/useUpdateBucketList";
import Loader from "react-spinners/BeatLoader";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Newsletter } from "../components/Newsletter";
import { window } from "browser-monads";

const BucketListPage = () => {
  let [lsItems, setLsItems] = useLocalStorage("bucketList", []);
  let [isOpenModal, setIsOpenModal] = useState(false);
  const url = window.location.href;
  const { loggedIn } = useAuth();
  const updateBlMutation = useUpdateBucketList();

  const { data, loading } = useDbBucketList();
  const bl = data?.bucketLists?.nodes[0];
  const items = lsItems;

  const emptyBl = () => {
    setLsItems([]);
    setIsOpenModal(false);
    loggedIn &&
      updateBlMutation({
        variables: {
          input: {
            idInput: bl?.databaseId,
            linksInput: [],
          },
        },
      });
  };

  const allCountries = items?.map(
    (item) => item.commonDataAttributes?.country?.name
  ) || ["1"];

  const countries = uniq(allCountries);
  const breadcrumbsTerms = [
    { name: "home", link: "/" },
    { name: "My lists" },
    { name: "Bucket list" },
  ];

  return (
    <Layout>
      <Breadcrumbs terms={breadcrumbsTerms} />
      <EmptyModal
        title="Empty bucket list"
        text="Are you sure? this cannot be undone."
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        action={emptyBl}
      />
      <PageLayout
        title="My bucket list"
        handleEmpty={() => setIsOpenModal(true)}
        notEmpty={items?.length > 0}
        sidebar={
          <div className="h-full space-y-base2">
            <Newsletter />
            <SidebarSocialShare url={url} />
          </div>
        }
      >
        {items?.length > 0 ? (
          countries?.map((country, i) => {
            const allItems = items.filter(
              (item) => item?.commonDataAttributes?.country?.name === country
            );

            return (
              <div key={i} className="bg-white">
                <CollapseSection title={country} listings>
                  <CollapseListings listings={allItems} />
                  <CardsGrid cards={allItems} className="md:hidden" />
                </CollapseSection>
              </div>
            );
          })
        ) : loading ? (
          <div className="flex justify-center py-20">
            <Loader size={20} color="#d3b27d" />
          </div>
        ) : (
          <NoResults
            title="Your bucket list is empty"
            subtitle="No-one should have an empty travel bucket list. Add something by clicking the plus icons on all of our recommendations - simple as that. Good luck!"
            className="mt-base2"
          />
        )}
      </PageLayout>
      {/* Quote */}
      <TravelQuote author="Mark Twain">
        “Twenty years from now you will be more disappointed by the things that
        you didn’t do than by the ones you did do. So throw off the bowlines.
        Sail away from the safe harbor. Catch the trade winds in your sails.
        Explore. Dream. Discover.”
      </TravelQuote>
    </Layout>
  );
};

export default BucketListPage;
