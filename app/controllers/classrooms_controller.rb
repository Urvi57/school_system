class ClassroomsController < ApplicationController
	def index
		@classrooms=Classroom.all
		respond_to do |format|
 			format.json { render :json => @classrooms, :status => :ok }
		end
	end
	def show
	 begin
		@classroom = Classroom.find(params[:id])
		respond_to do |format|
 			format.json { render :json => @classroom, :status => :ok }
 		end
		rescue => e
			p e.message
			respond_to do |format|
 				format.json {render :json =>  { "error" => e.message}, :status  => :unprocessable_entity}
 			end
	  end
	end
	def create
		begin
		 @classroom = Classroom.new(params.require(:classroom).permit(:name, :number_of_students, :school_id).merge(:subject_ids=>params[:classroom][:subject_ids]))
		 if @classroom.save!
		 	respond_to do |format|
 			format.json {render json: @classroom, :status => :ok}
 			end
 		end
		rescue => e
    	respond_to do |format|
 			format.json {render :json => { "error" => e.message}, :status  => :unprocessable_entity}
 		end
     end
	end
	def update
		begin
		@classroom = Classroom.find(params[:id])
		if @classroom.update_attributes!(params.require(:classroom).permit(:name, 
			:number_of_students, :school_id).merge(:subject_ids=>params[:classroom][:subject_ids]))
			respond_to do |format|
 			format.json {render :json => @classroom, :status => :ok}
 			end
 		end
		rescue => e
	    	p e.message
			respond_to do |format|
 				format.json {render :json => {"error" => e.message}, :status  => :unprocessable_entity}
 			end
		end
	end
	def destroy
	    begin
		@classroom = Classroom.find(params[:id])
	   	if @classroom.destroy
	   	  @classrooms = Classroom.all
	      respond_to do |format|
 		  format.json {render :json => @classroom, :status => :ok}
 		  end
	    end
	    rescue => e
	   	  p e.message
       	  respond_to do |format|
 		  format.json {render :json => {"error" => e.message}, :status  => :unprocessable_entity}
 		  end
    	end
	end
  def filtered_index
    # refactor this to generate dynamic query
    begin
      @school = School.find(params[:school_id])
	    @classrooms = Classroom.where(:school_id => @school.id)
      render :json => @classrooms.to_json(:methods => [:classroom, :subject_details, :school_details]), :status => :ok
			rescue => e
			p e.message
			respond_to do |format|
 			format.json {render :json =>  { "error" => e.message}, :status  => :unprocessable_entity}
 			end
  	end
  end
  def filtered_index_classroom
    # refactor this to generate dynamic query
    begin
    	if params[:classroom_id] 
	    	p Classroom.where(:id => params[:classroom_id])
	      @classroom = Classroom.where(:id => params[:classroom_id]).all
	    	render :json => @classroom.to_json(:methods => [:classroom, :subject_details, :school_details]), :status => :ok
	    else
	    	format.json {render :json =>  "error", :status  => :unprocessable_entity}
	    end	
			rescue => e
			p e.message
			respond_to do |format|
			format.json {render :json =>  { "error" => e.message}, :status  => :unprocessable_entity}
 			end
	  end
  end
end
