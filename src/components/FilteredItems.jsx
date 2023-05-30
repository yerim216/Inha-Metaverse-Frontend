import React from "react";
import styles from "../styles/modules/FilteredItems.module.css";

export default function FilteredItems({ selectedFilters }) {
  return (
    <section className={styles.filtersSection}>
      <section className={styles.contentSection}>
        <div className={styles.warning}>* 최대 6개 분야</div>
        <div className={styles.filterBox}>
          {selectedFilters.map((selectedFilter) => {

            return <div className={styles.filterBtn}>{selectedFilter} X</div>;
          })}
        </div>
      </section>
    </section>
  );
}
