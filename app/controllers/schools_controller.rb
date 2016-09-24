class SchoolsController < ApplicationController
	def index
		@schools=School.all
		respond_to do |format|
 			format.html {render 'index'}
			format.json {render :json => @schools, :status => :ok}
		end
	end
	def show
		begin
		@school = School.find(params[:id])
		
		respond_to do |format|

 			format.html 
			format.json {render :json => @school, :status => :ok}
		end
		
		rescue => e
      		p e.message
      		respond_to do |format|

 				format.html 
				format.json {render :json => { "error" => e.message} , :status  => :unprocessable_entity}
			end
		end
	end
	def new
		@school = School.new
		respond_to do |format|

 			format.html 
			format.json {render :json => @school, :status => :ok}
		end
	end


	 def edit 
	 	@school = School.find(params[:id])
	 	respond_to do |format|

 			format.html 
			format.json {render :json => @school, :status => :ok}
		end
	 end
	def create
		@school = School.new(school_param)
		
		if @school.save
			# redirect_to @school
			respond_to do |format|

 				format.html {render 'show'}
				format.json {render :json => @school, :status => :ok}
			end
		else
			# render 'new', status: :unprocessable_entity
			respond_to do |format|

 				format.html {render 'new'}
				format.json {render :json => @school.errors , :status  => :unprocessable_entity}
			end
		end
	end
	def update
		begin
			@school = School.find(params[:id])
			if @school.update_attributes(school_param)
				
				respond_to do |format|

 					format.html {render 'show'}
					format.json {render :json => @school, :status => :ok}
				end
			else
				respond_to do |format|

 				format.html  {render 'new'}
				format.json {render :json => @school.message , :status  => :unprocessable_entity}
			end
			end
			rescue => e
		
			respond_to do |format|

 				format.html {render 'new'}
				format.json {render :json => { "error" => e.message} , :status  => :unprocessable_entity}
			end
		end
	end
	def destroy
		begin
		@schools = School.find(params[:id])
		
	   		if @schools.destroy
	    		respond_to do |format|
	    			format.html {render 'index'}
	    			format.json {render :json => @school, :status => :ok}
	      		end
	   		else
	   			respond_to do |format|

 					format.html {render 'index'}
					format.json {render :json => { "error" => e.message} , :status  => :unprocessable_entity}
				end
	   		end
	   		rescue => e
       	  	 	respond_to do |format|

 					format.html {render 'index'}
					format.json {render :json => { "error" => e.message} , :status  => :unprocessable_entity}
				end
        	end
   
	end

	private 
	def school_param
		 params.require(:school).permit(:name, :address, :city, :zipcode, :state, :phone_no)
	end	
	
end
