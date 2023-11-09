import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import LandingPageBanner from "@/components/LandingPageBanner";

export default function Home() {
  return (
    <main className="w-[100wh] h-[100vh] flex flex-col items-center justify-center text-white">
      <LandingPageBanner />
      <div className="flex flex-col justify-center items-center w-full px-4 md:w-[500px]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Who are we ?</AccordionTrigger>
            <AccordionContent>
              We are an anime live streaming website made for educational
              purposes by pasionate developpers who loves anime.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How are we getting the anime ?</AccordionTrigger>
            <AccordionContent>
              We don&apos;t upload any copyrighted content to its own server or
              upload to any 3rd party websites and host the links on the
              site&apos;s pages. The site uses a web crawler and display it on
              the pages. We merely display these links on the site with an
              interface for the convenience of the user (including blocking
              advertisements and trackers from these third party sites). We
              don&apos;t profit off of these videos in anyway.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Who really owns the content ?</AccordionTrigger>
            <AccordionContent>
              We just crawl links from websites such as GogoAnime and osanime
              and remove the ridiculous amount of ads using a few HTML and
              linking tricks, then we link or embed the same content that was
              uploaded by the previous mentioned third parties. GogoAnime (third
              party) or its users upload the content to a third party such as
              Google Video, VidCDN, Fembed, RapidVideo, Mp4Upload, openload and
              Streamango. All trademarks, videos, trade names, service marks,
              copyrighted work, logos referenced herein belongs to their
              respective owner/companies. Ikigai is not responsible for what
              other people are uploading to 3rd party sites. We encourage all
              copyright owners, to recognize that videos embedded are from other
              various site like included above! if you have legal issues please
              contact appropriated media file owners / hosters.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
