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
}