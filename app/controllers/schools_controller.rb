class SchoolsController < ApplicationController
	def index
		@school=School.all
		render :json => @school
	end
	def show
		begin
		@school = School.find(params[:id])
		# if @school
			render :json => @school, :status => :ok
		# else
		# 	render :json => @school.errors, :status  => :unprocessable_entity
		# end
		rescue => e
      		p e.message
			render :json => { "error" => e.message} , :status  => :unprocessable_entity
		end
	end
	def new
		@school = School.new()
	end
	 def edit 
	 	@school = School.find(params[:id])
	 end
	def create
		@school = School.new(school_param)
		
		if @school.save
			render :json => @school, :status  => :ok
		else

			render :json => @school.errors, :status  => :unprocessable_entity
		end
	end
	def update
		begin
			@school = School.find(params[:id])
			if @school.update_attributes(school_param)
				render :json => @school, :status  => :ok
			else
				render :json => @school.errors, :status  => :unprocessable_entity
			end
			rescue => e
		
			render :json => { "error" => e.message}, :status  => :unprocessable_entity
		end
	end
	def destroy
		begin
		@school = School.find(params[:id])
		#School.transaction do
	   		if @school.destroy
	     #	 @school.classroom.destroy
	      	 render :json => @school, :status  => :ok
	   		else
	   			render :json => @school.errors, :status  => :unprocessable_entity
	   		end
	   		rescue => e
       	  	 render :json => {"error" => e.message}, :status  => :unprocessable_entity
        	end
   
	end
	private 
	def school_param
		 params.require(:school).permit(:name, :address, :city, :zipcode, :state, :phone_no)
	end	
	
end
