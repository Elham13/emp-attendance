import styles from "../../styles/home.module.css";

const AdminScreen = () => {
  return (
    <div className={styles.dataWrapper}>
      <div className={styles.dataInner}>
        <div className={styles.inputBox}>
          <form>
            <label htmlFor='empName'>See details of</label>
            <select
              id='seeDetailOfEmp'
              name='empName'
              className={styles.searchInputs}
              //   onchange="this.parentElement.submit()"
            >
              <option selected disabled>
                Select an employee
              </option>
              <option value='Keerthana'>Keerthana</option>
              <option value='Sresha'>Sresha</option>
              <option value='Swathi'>Swathi</option>
              <option value='Padma'>Padma</option>
              <option value='Kanugula Sairam'>Kanugula Sairam</option>
              <option value='Elhamuddin'>Elhamuddin</option>
            </select>
          </form>
        </div>
        <input
          type='text'
          className={styles.searchInputs}
          id='searchStatusInAdmin'
          //   onkeyup='searchAllStatus()'
          placeholder='Search The Status'
        />
        <span className='adminFoundNoOfRecords'></span>

        {/* All emp dir */}
        <div className={styles.dataTableWrapper}>
          <h3 className={styles.tableHeading}>Keerthana's DVR</h3>
          <table className={styles.dataTable}>
            <tr>
              <th>Creation Date</th>
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
              <th>Appointments</th>
              <th>Client Requirement</th>
            </tr>
            <tr>
              <td>239012</td>
              <td>Maruti</td>
              <td>Raaj</td>
              <td>23909039</td>
              <td>raj@example.com</td>
              <td>web.com</td>
              <td>cat1</td>
              <td>just dial</td>
              <td>good</td>
              <td>folloup</td>
              <td>390</td>
              <td>921039</td>
              <td>kldsfj</td>
              <td>alkdsj</td>
            </tr>
          </table>
        </div>
        <span className='foundSingleTableRecord'></span>

        <div className={styles.userWrapper}>
          <div
            className={
              `${styles.dataTableWrapper} ` + `${styles.userDataTableWrapper}`
            }
          >
            <div className={styles.empContainer}>
              <h3>List of employees</h3>
              <a
                href='javascript:void(0)'
                className={`${styles.add} ` + `${styles.addEmployee}`}
              >
                Add new employee
                <span>
                  <i className='fas fa-plus'></i>
                </span>
              </a>
            </div>
            <table className={`${styles.dataTable} ` + `${styles.userTable}`}>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Role</th>
                <th>Active Time</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td>1</td>
                <td>sfkdl</td>
                <td>alksdf</td>
                <td>2389</td>
                <td>12lk</td>
                <td>0932</td>
                <td>aldkfs</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      {/* start here */}
    </div>
  );
};

export default AdminScreen;
