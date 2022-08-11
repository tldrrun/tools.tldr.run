import React from "react";

export default function index() {
  return <div></div>;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/",
    },
  };
}
