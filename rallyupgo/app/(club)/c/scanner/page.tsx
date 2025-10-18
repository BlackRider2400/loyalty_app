import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import ClubFooter from "@/components/ClubFooter";

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import ScannerClient from "@/components/QRcode/ScannerClient";

const ScannerPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <section className="bg-primary-orange w-full pt-12 pb-5 flex-center justify-between px-3">
                <Link href={ROUTES.CLUB_HOME}>
                    <Image
                        src="/icons/arrow.svg"
                        alt="back"
                        width={24}
                        height={24}
                    />
                </Link>
                <h1 className="text-[20px] font-semibold text-white">
                    Scan QR code
                </h1>
                <AlertDialog>
                    <AlertDialogTrigger className="w-6 h-6 flex-center">
                        <Image
                            src="/icons/infoIcon.svg"
                            alt="info"
                            width={24}
                            height={24}
                        />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Scanning members&apos; codes
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Point the camera at a member&apos;s QR. After a
                                successful scan, you can mark a purchase or
                                court rental and award RallyCoins.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-center gap-2 flex-row">
                            <AlertDialogCancel className="flex-1">
                                Got it
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </section>

            <main className="flex-1 bg-primary-blue p-4">
                <ScannerClient />
            </main>

            <ClubFooter />
        </div>
    );
};

export default ScannerPage;
