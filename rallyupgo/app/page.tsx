import Image from "next/image";
import React from "react";

const Home = () => {
    return (
        <div>
            <Image
                src="https://mylovelyserver.fun:8443/rally-up-go/uploads/1758239054578_test_image.jpeg"
                alt="bananas"
                width={400}
                height={400}
            />
        </div>
    );
};

export default Home;
