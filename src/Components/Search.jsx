
const Search = ({searchText,setSearchText}) => {
    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="logo"/>
                <input
                 type="text"
                 className="search-input"
                 placeholder="Search through thousands of movies"
                 value={searchText}
                 onChange ={(e)=> setSearchText(e.target.value)}
                />
            </div>
        </div>
    )
}
export default Search
