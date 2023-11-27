import React from "react";
import styles from "../styles/modules/FilteredItems.module.css";

export default function FilteredItems({
  selectedFilters,
  deleteFilter,
  deleteFilterIndex,
  findFieldIndexWithTitle,
  fields,
}) {
  return (
    <section className={styles.filtersSection}>
      <section className={styles.contentSection}>
        <div className={styles.warning}>* 최대 6개 분야</div>
        <div className={styles.filterBox}>
          {selectedFilters.map((selectedFilter, idx) => {
            return (
              <div
                key={idx}
                className={styles.filterBtn}
                onClick={() => {
                  deleteFilter(selectedFilter);
                  const filterIndex = findFieldIndexWithTitle(
                    fields,
                    selectedFilter
                  );
                  // console.log(filterIndex);
                  deleteFilterIndex(filterIndex);
                  // 제대로 된 필터인덱스 뭐시기 해서 삭제해야함
                }}
              >
                {selectedFilter} X
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
