import React, {Component} from 'react';

class CreateBucket extends Component{
    render(){
        return(
            <article className="content item-editor-page">
                <div className="title-block">
                    <h3 className="title"> Add new Bucket
                        <span className="sparkline bar"></span>
                    </h3>
                </div>

                <form name="item" method="post">
                    <div className="card card-block">
                        <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right">
                                Name:
                            </label>

                            <div className="col-sm-10">
                                <input type="text" id="bucket_name" className="form-control boxed" placeholder="" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right">
                                Description:
                            </label>

                            <div className="col-sm-10">
                                <input type="text" id="description" className="form-control boxed" placeholder="" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right">
                                Category:
                            </label>

                            <div className="col-sm-10">
                                <select className="c-select form-control boxed" id="category">
                                    <option selected disabled>Select Category</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-sm-10 col-sm-offset-2">
                            <button type="submit" className="btn btn-primary">
                                Add
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Add & New
                            </button>
                        </div>
                    </div>
                </form>
            </article>

        )
    }
}
export default CreateBucket;