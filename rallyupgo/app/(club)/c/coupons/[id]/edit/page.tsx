import React from "react";

const EditCoupon = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return <div>EditCoupon {id}</div>;
};

export default EditCoupon;
