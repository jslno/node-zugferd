import { cn, kFormatter } from "@/lib/utils";
import {
  ArrowRight,
  ArrowRightIcon,
  BookIcon,
  BookOpenIcon,
  Check,
  FileCode,
  FileSymlink,
  FileUp,
  LucideIcon,
  PencilRuler,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Badge } from "../ui/badge";

type Feature = {
  Icon?: LucideIcon | (() => React.ReactNode);
  label: string;
  title: string;
  description: string;
  meta?: {
    className?: string;
    COMING_SOON?: boolean;
  };
};

const features: Feature[] = [
  {
    Icon: FileUp,
    label: "Extraction",
    title: "<strong>Parse</strong> ZUGFeRD/Factur-X Documents",
    description:
      "Easily extract and process data from existing ZUGFeRD/Factur-X invoices, enabling smooth integration and automation of your document handling processes.",
    meta: {
      COMING_SOON: true,
    },
  },
  {
    Icon: FileSymlink,
    label: "Embedding",
    title: "<strong>Embed</strong> XML in <strong>PDF/A-3b</strong>",
    description:
      "Embed the generated XML invoice into a PDF/A-3b document, creating a hybrid invoice that is both human-readable and machine-processable.",
  },
  {
    Icon: Check,
    label: "Validation",
    title: "Ensure <strong>XML Compliance</strong>",
    description:
      "Verify the correctness and compliance of the generated XML against the ZUGFeRD/Factur-X schema to ensure it meets industry standards.",
  },
  {
    Icon: FileCode,
    label: "Generation",
    title: "<strong>Generate</strong> ZUGFeRD/Factur-X compliant XML",
    description:
      "Generate structured XML invoices following the Factur-X (ZUGFeRD) standard, ensuring compatibility with electronic invoicing regulations and smooth integration with financial systems. This feature guarantees that your invoices meet industry compliance standards, making the invoicing process faster, more accurate, and fully aligned with legal requirements.",
    meta: {
      className: "md:col-span-2",
    },
  },
  {
    Icon: PencilRuler,
    label: "Custom Profiles",
    title: "Easily <strong>Customizable</strong>",
    description:
      "Effortlessly create and customize your own profiles. Whether you need an invoice or an order profile, you can define the structure, fields, and content to match your exact requirements.",
  },
];

export const Features = ({ stars }: { stars: string }) => {
  return (
    <div className="md:w-10/12 px-8 font-geist mt-10 mx-auto relative space-y-8">
      <div className="space-y-2 md:text-center">
        <h1 className="text-3xl">
          Everything you need for electronic paperwork
        </h1>
        <p className="text-muted-foreground text-lg">
          Generate and process ZUGFeRD documents with ease.
        </p>
      </div>

      <div className="grid md:grid-cols-3 border-b border-r bg-gradient-to-tr from-muted/10 via-muted/25 to-muted/10 drop-shadow-lg backdrop-blur-lg">
        {features.map(({ title, label, description, Icon, meta }, i) => (
          <div
            key={i}
            className={cn(
              "p-4 border-l border-t",
              i >= 3 && "md:border-t",
              meta?.className
            )}
          >
            <div
              className={cn(
                "space-y-4",
                !!meta?.COMING_SOON && "opacity-50 pointer-events-none"
              )}
            >
              <div className="space-y-1.5">
                <div className="flex items-center flex-wrap-reverse gap-1.5">
                  <div className="flex items-center gap-1.5">
                    {!!Icon && <Icon className="size-4" />}
                    <p className="text-muted-foreground text-sm">{label}</p>
                  </div>
                  {!!meta?.COMING_SOON && (
                    <Badge variant="outline">Coming Soon</Badge>
                  )}
                </div>
                <p
                  className="max-w-lg text-xl font-normal tracking-tighter"
                  dangerouslySetInnerHTML={{
                    __html: title,
                  }}
                />
              </div>
              <p className="text-muted-foreground text-sm">
                {description}
                <Link
                  href="/docs"
                  className="group ml-2 underline underline-offset-2 inline-flex items-center"
                >
                  <span>Learn more</span>
                  <ArrowRight className="ml-1 delay-75 size-4 -translate-x-4 opacity-0 scale-95 group-hover:translate-x-0 group-hover:opacity-100 group-hover:scale-100 transition-all" />
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="min-h-[70dvh] flex">
        <div className="grow flex flex-col md:items-center justify-center gap-6">
          <div className="relative flex flex-col gap-6">
            <h1 className="relative text-3xl max-w-fit md:self-center">
              Get Started now
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%-30px)] -z-10 size-32 bg-accent-foreground/40 dark:bg-accent-foreground/25 animate-pulse duration-[3200] repeat-infinite blur-3xl rounded-full"
                aria-hidden="true"
              />
            </h1>
            <p className="md:max-w-3xl text-muted-foreground">
              Power up your invoicing with{" "}
              <span className="text-foreground font-medium">node-zugferd</span>.
              Generate fully compliant Factur-X invoices, seamlessly embed XML
              into PDFs, and integrate effortlessly with your existing workflow.
              No unnecessary complexity — just{" "}
              <span className="text-foreground font-medium">
                a fast, reliable way to handle electronic invoices.
              </span>
            </p>
          </div>
          <div
            data-before="Get Started in a minute"
            className="flex flex-wrap items-center gap-4 lg:before:absolute lg:before:-translate-x-[calc(100%+1rem)] lg:before:max-w-fit lg:before:content-[attr(data-before)]"
          >
            <Link href="/docs/introduction">
              <Button
                effect="expandIcon"
                icon={ArrowRightIcon}
                iconPlacement="right"
              >
                <BookOpenIcon className="mr-2 opacity-60" />
                Introduction
              </Button>
            </Link>
            <Link
              className={buttonVariants({
                variant: "outline",
                className: "group",
              })}
              target="_blank"
              href="https://github.com/jslno/node-zugferd"
            >
              <StarIcon
                className="text-muted-foreground group-hover:text-amber-400 group-hover:fill-amber-400 size-4 transition-colors duration-300"
                aria-hidden="true"
              />
              Star on GitHub
              <span className="text-muted-foreground before:bg-input relative ms-1 inline-flex h-full items-center justify-center rounded-full px-3 text-xs font-medium before:absolute before:inset-0 before:left-0 before:w-px">
                <GitHubStars stars={stars} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const GitHubStars = ({ stars }: { stars: string }) => {
  let res = parseInt(stars?.replace(/,/g, ""), 10);

  return kFormatter(res);
};
