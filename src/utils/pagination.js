import _ from "lodash";

export default function paginate(items, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
