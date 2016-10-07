class SchoolsController < ApplicationController
	def index
		p "index"
		@schools=School.all
		respond_to do |format|
 			# format.html 
			format.json {render :json => @schools, :status => :ok}
		end
	end
	def show
		begin
		@school = School.find(params[:id])
		respond_to do |format|
 			# format.html 
			format.json {render :json => @school, :status => :ok}
		end
		rescue => e
      		p e.message
      		respond_to do |format|
 				# format.html 
				format.json {render :json => { "error" => e.message} , :status  => :unprocessable_entity}
			end
		end
	end
	def create
		@school = School.new(school_param)
		begin
		if @school.save!
			respond_to do |format|
				format.json {render :json => @school, :status => :ok}
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
			@school = School.find(params[:id])
			if @school.update_attributes!(school_param)
				respond_to do |format|
				format.json {render :json => @school, :status => :ok}
				end
			end
			rescue => e
			respond_to do |format|
			format.json {render :json => { "error" => e.message} , :status  => :unprocessable_entity}
			end
		end
	end
	def destroy
		begin
		@school = School.find(params[:id])
			if @school.destroy
	   		@schools = School.all
	    	respond_to do |format|
	    	format.json {render :json => @school, :status => :ok}
	     	end
	   		end
	   		rescue => e
       	  respond_to do |format|
       	  @schools = School.all
 					# format.html {render 'index'}
					format.json {render :json => { "error" => e.message} , :status  => :unprocessable_entity}
			end
     	end
	end
	private 
	def school_param
		 params.require(:school).permit(:name, :address, :city, :zipcode, :state, :phone_no)
	end	
	
end
