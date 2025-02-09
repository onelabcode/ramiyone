"use client"; // This ensures Next.js renders it on the client only

export default function ItemBody({ body, className }) {
  return (
    <div
      className={`${className}`}
      //   dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
