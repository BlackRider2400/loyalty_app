import React from "react";

const BasicMetrics = () => {
    return (
        <div className="bg-light-blue rounded-[10px] w-[70%] flex flex-col text-white">
            <div className="flex-center px-2 py-2">
                <h2 className="font-bold text-[16px] w-full text-end mr-2">
                    Total points awarded
                </h2>
                <p className="w-[50%] font-bold text-[24px] text-center justify-self-end">
                    112313
                </p>
            </div>
            <div className="flex-center bg-primary-blue/50 px-2 py-2">
                <h2 className="font-bold text-[16px] w-full text-end mr-2">
                    New users
                </h2>
                <p className="w-[50%] font-bold text-[24px] text-center justify-self-end">
                    21
                </p>
            </div>
            <div className="flex-center px-2 py-2">
                <h2 className="font-bold text-[16px] w-full text-end mr-2">
                    Total number of scans
                </h2>
                <p className="w-[50%] font-bold text-[24px] text-center justify-self-end">
                    100
                </p>
            </div>
        </div>
    );
};

export default BasicMetrics;
