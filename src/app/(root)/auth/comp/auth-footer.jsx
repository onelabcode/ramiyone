import Link from "next/link";

export function AuthFooter({ text, linkText, linkHref }) {
  return (
    <div className="mt-4 text-center text-sm">
      <span className="text-muted-foreground">{text} </span>
      <Link
        href={linkHref}
        className="text-primary hover:underline font-medium"
      >
        {linkText}
      </Link>
    </div>
  );
}
