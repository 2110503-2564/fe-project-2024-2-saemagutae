import ExploreSpaces from "@/components/ExploreSpaces";
import getSpaces from "@/libraries/spacesAPI";

export default async function explorePage() {
    const spaces = await getSpaces() 
    console.log(spaces)
    return (

        <main>
            <div className="bg-gray min-h-screen">
            <ExploreSpaces spaceJson = {spaces}/>
                </div>       
       
        </main>
    );
}