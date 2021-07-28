import styles from "../../styles/home.module.css";

const EmpScreen = () => {
  return (
    <div className={styles.dataWrapper}>
      <div className={styles.dataInner}>
        <input
          type='text'
          className={styles.searchInputs}
          //   onkeyup="searchTextTable(this, 'dvrTable', 10)"
          placeholder='Search The Status'
        />
        <input
          type='text'
          className={styles.searchInputs}
          //   onkeyup="searchTextTable(this, 'dvrTable', 13)"
          placeholder='Search Appointments'
        />
        <input
          type='text'
          className={styles.searchInputs}
          //   onkeyup="searchTextTable(this, 'dvrTable', 12)"
          placeholder='Search Followups'
        />
        <span className='noOfFoundRecords'></span>

        {/* dvr */}
        <div className={styles.dataTableWrapperClient}>
          <a href='javascript:void(0)' className={styles.add}>
            Add
            <span>
              <i className='fas fa-plus'></i>
            </span>
          </a>
          <table className={styles.dataTable}>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Business Name</th>
              <th>Contact person name</th>
              <th>Contact person number</th>
              <th>Email</th>
              <th>Website</th>
              <th>Category</th>
              <th>Data Source</th>
              <th>Remarks</th>
              <th>Status</th>
              <th>Qoutation</th>
              <th>Followups</th>
              <th>Appointements</th>
              <th>Client Requirement</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>1</td>
              <td>23345</td>
              <td>lkasdjf</td>
              <td>alskdfj</td>
              <td>239329090</td>
              <td>lkasdjf</td>
              <td>laskdf</td>
              <td>alskdjf</td>
              <td>xzc</td>
              <td>lasdfj</td>
              <td>lkasjdf</td>
              <td>1209</td>
              <td>2939</td>
              <td>alskfd</td>
              <td>a;lsdfj</td>
              <td>askldfj</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpScreen;
