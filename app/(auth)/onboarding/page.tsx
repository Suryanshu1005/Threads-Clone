import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import { use } from "react";

async function Onboarding() {
    const user = await currentUser()

    const userInfo = {};

    const userData = {
        id : "",
        objectId : userInfo._id,
        username : user?.username || userInfo?.username,
        name : user?.firstName || userInfo?.firstname || "",
        bio : userInfo?.bio,
        image : userInfo?.image || user?.imageUrl,
    }

    return ( 
        <main className="mx-auto flex flex-col max-w-3xl justify-start px-10 py-20">
            <h1 className="head-text">Onboarding</h1>
            <p className="text-base-regular text-light-2">Complete you profile to continue using threads</p>
            <section className="bg-dark-2 mt-9 p-10">
                <AccountProfile user = {userData} btnTitle = "Continue" />
            </section>
        </main>
     );
}
 
export default Onboarding;