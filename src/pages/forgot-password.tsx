import { SendPasswordResetEmailForm } from "../components/auth";
import React, { useEffect } from "react";
import { useStaticQuery, graphql, navigate } from "gatsby";
import { PasswordPagesLayout } from "../components/layout/PasswordPagesLayout";
import { Layout } from "../components";
import useAuth from "~/context/AuthContext";

const LOST_PASS_QUERY = graphql`
  query {
    wp {
      options {
        specialPagesImages {
          lostPasswordImage {
            ...FullImage
          }
        }
      }
    }
  }
`;

export default function ForgotPassword() {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  const data = useStaticQuery(LOST_PASS_QUERY);
  const { lostPasswordImage: image } = data?.wp?.options?.specialPagesImages;
  return (
    <Layout>
      <PasswordPagesLayout title="Forgot your password?" image={image}>
        <SendPasswordResetEmailForm />
      </PasswordPagesLayout>
    </Layout>
  );
}
