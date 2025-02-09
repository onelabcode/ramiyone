"use client";
import parse from "html-react-parser";

export default function ItemBody({ body, className }) {
  return <div className={className}>{parse(body)}</div>;
}
