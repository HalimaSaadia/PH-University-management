import { Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    (this.modelQuery = modelQuery), (this.query = query);
  }

  search(searchableFields: string[]) {
    if (this.query.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) => ({
            [field]: { $regex: this.query.searchTerm, $options: "i" },
          })
        ),
      });
    }
    return this
  }

  filter(){
    const queryObj = { ...this.query };
    const excludedFields = ["searchTerm", "limit", "page","fields"];
    excludedFields.forEach((field) => delete queryObj[field]);
    this.modelQuery = this.modelQuery.find(queryObj)
    return this
  }

  paginate(){
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 1;
    const skip = (page-1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit)
    return this
  }

  fields(){
    let fields = "-__v" 
    if(this.query.fields as string){
      fields = (this.query.fields as string).split(",").join(" ")
    }
    
     this.modelQuery = this.modelQuery.select(fields)
     return this
  }
}

export default QueryBuilder